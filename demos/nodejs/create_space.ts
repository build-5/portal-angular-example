import { https } from '@build-5/client';
import { API_KEY, Build5 } from '@build-5/client/https';
import { Dataset, Network, Space } from '@build-5/interfaces';
import { environment } from 'src/environments/environment';
import { address } from './utils/secret';
import { walletSign } from './utils/utils';

async function main() {
  const origin = Build5.TEST;
  let response: Space;
  const userSign = await walletSign(address.bech32, address);
  try {
    response = await https(origin).project(environment.build5Token)
      .dataset(Dataset.SPACE)
      .create({
        address: address.bech32,
        signature: userSign.signature,
        publicKey: {
          hex: userSign.publicKey,
          network: Network.RMS,
        },
        // Use SOONAVERSE TEST - wen.soonaverse.com
        projectApiKey: API_KEY[origin],
        body: {
          name: 'TanKRURK',
        },
      });
  } catch (e) {
    console.log(e);
    return;
  }

  console.log(response);
}

main();
