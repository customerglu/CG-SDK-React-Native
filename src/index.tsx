import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-rncustomerglu' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Rncustomerglu = NativeModules.Rncustomerglu

  ? NativeModules.Rncustomerglu
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );
console.log("NativeModules1231", NativeModules);
console.log("Rncustomerglu123123123", Rncustomerglu)

// export function multiply(a:number,b:number): Promise<number> {
//   return Rncustomerglu.multiply(a,b);
// }
export function registerEx(): Promise<number> {
  return Rncustomerglu.registerDevice();
}

