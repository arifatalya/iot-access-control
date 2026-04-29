const { connect, signers, hash } = require('@hyperledger/fabric-gateway');
const grpc = require('@grpc/grpc-js');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const CHANNEL_NAME = 'mychannel';
const MSP_ID = 'Org1MSP';

const CRYPTO_PATH = path.resolve(
  __dirname, '..', '..', '..', '..', 'test-network', 'organizations',
  'peerOrganizations', 'org1.example.com'
);

const CERT_DIR = path.join(CRYPTO_PATH, 'users', 'Admin@org1.example.com', 'msp', 'signcerts');
const KEY_DIR = path.join(CRYPTO_PATH, 'users', 'Admin@org1.example.com', 'msp', 'keystore');
const TLS_CERT_PATH = path.join(CRYPTO_PATH, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt');
const PEER_ENDPOINT = 'localhost:7051';
const PEER_HOST_ALIAS = 'peer0.org1.example.com';

function firstFileInDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  if (files.length === 0) throw new Error(`No files in ${dirPath}`);
  return path.join(dirPath, files[0]);
}

let gateway;
let network;

async function initGateway() {
  const tlsCert = fs.readFileSync(TLS_CERT_PATH);
  const tlsCredentials = grpc.credentials.createSsl(tlsCert);
  const client = new grpc.Client(PEER_ENDPOINT, tlsCredentials, {
    'grpc.ssl_target_name_override': PEER_HOST_ALIAS,
  });

  const certPath = firstFileInDir(CERT_DIR);
  const certificate = fs.readFileSync(certPath).toString();
  const identity = { mspId: MSP_ID, credentials: Buffer.from(certificate) };

  const keyPath = firstFileInDir(KEY_DIR);
  const privateKeyPem = fs.readFileSync(keyPath).toString();
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  const signer = signers.newPrivateKeySigner(privateKey);

  gateway = connect({ client, identity, signer, hash: hash.sha256 });
  network = gateway.getNetwork(CHANNEL_NAME);

  console.log('Connected to Fabric gateway');
}

function getContract(chaincodeName) {
  return network.getContract(chaincodeName);
}

module.exports = {
initGateway,
getContract 
};
