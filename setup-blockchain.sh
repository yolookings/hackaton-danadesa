#!/bin/bash

echo "🚀 Setting up Village Fund Blockchain Project..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Hardhat globally if not installed
if ! command -v hardhat &> /dev/null; then
    echo "🔧 Installing Hardhat globally..."
    npm install --global hardhat-shorthand
fi

# Compile smart contracts
echo "🔨 Compiling smart contracts..."
npx hardhat compile

# Start local blockchain network
echo "🌐 Starting local blockchain network..."
echo "Please run 'npx hardhat node' in a separate terminal"

# Deploy contracts (run this after starting the node)
echo "📋 To deploy contracts, run:"
echo "npx hardhat run scripts/deploy.js --network localhost"

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Start Ganache or run 'npx hardhat node'"
echo "2. Deploy contracts with 'npm run deploy'"
echo "3. Connect MetaMask to localhost:8545"
echo "4. Import account from Hardhat/Ganache"
echo "5. Start the frontend with 'npm run dev'"
