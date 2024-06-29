#!/bin/bash

# Create EKS cluster
awslocal eks create-cluster  --name cluster1 --role-arn "arn:aws:iam::000000000000:role/eks-role" --resources-vpc-config "{}"

# Build Docker image
docker build -t book-store-image .

# Create ECR repository
awslocal ecr create-repository --repository-name book-store --image-scanning-configuration scanOnPush=true

# Tag Docker image
docker tag book-store-image 000000000000.dkr.ecr.us-east-1.localhost.localstack.cloud:4566/book-store

# Push Docker image to ECR
docker push 000000000000.dkr.ecr.us-east-1.localhost.localstack.cloud:4566/book-store

# Wait for EKS cluster to be active
while true; do
  status=$(awslocal eks describe-cluster --name cluster1 --query "cluster.status" --output text)
  if [ "$status" = "ACTIVE" ]; then
    break
  else
    echo "Waiting for EKS cluster to be active..."
    sleep 10
  fi
done

# Update kubeconfig and set context
awslocal eks update-kubeconfig --name cluster1 && kubectl config use-context arn:aws:eks:us-east-1:000000000000:cluster/cluster1

# Apply Kubernetes deployment
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: book-store
  labels:
    app: book-store
spec:
  replicas: 1
  selector:
    matchLabels:
      app: book-store
  template:
    metadata:
      labels:
        app: book-store
    spec:
      containers:
      - name: book-store
        image: 000000000000.dkr.ecr.us-east-1.localhost.localstack.cloud:4566/book-store
        ports:
        - containerPort: 3000
EOF

# Create Kubernetes service
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: book-store
spec:
  selector:
    app: book-store
  ports:
  - name: http
    protocol: TCP
    port: 3000
    targetPort: 3000
  clusterIP: 172.20.238.23
    clusterIPs:
      - 172.20.238.23
    type: ClusterIP
    sessionAffinity: None
    ipFamilies:
      - IPv4
    ipFamilyPolicy: SingleStack
    internalTrafficPolicy: Cluster
EOF

# Expose Kubernetes ingress
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: book-store
  annotations:
    ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - http:
      paths:
      - path: /api/book-store
        pathType: Prefix
        backend:
          service:
            name: book-store
            port:
              number: 3000
EOF
