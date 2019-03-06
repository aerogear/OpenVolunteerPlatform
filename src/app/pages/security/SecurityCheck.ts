import { DeviceCheck } from '@aerogear/security';
import { DeviceCheckResult } from '@aerogear/security/src/deviceTrust/DeviceCheckResult';

export class SecurityCheckResult implements DeviceCheckResult {
  passed: boolean;
  name: string;
  constructor(private deviceCheckResult: DeviceCheckResult,
    private messageWhenSecure: string,
    private messageWhenUnsecure: string,
    private secureWhenFalse) {
      this.passed = this.isSecure();
      this.name = deviceCheckResult.name;
  }

  isSecure(): boolean {
    if (this.secureWhenFalse) {
      return !this.deviceCheckResult.passed;
    }
    return this.deviceCheckResult.passed;
  }

  getLabel(): string {
    if (this.isSecure()) {
      return this.messageWhenSecure;
    }
    return this.messageWhenUnsecure;
  }
}

export class SecurityCheck implements DeviceCheck {
  public name: string;
  constructor(private deviceCheck: DeviceCheck,
              public messageWhenSecure: string,
              public messageWhenUnsecure: string,
              private secureWhenFalse = false) {
    this.name = deviceCheck.name;
  }

  check(): Promise<DeviceCheckResult> {
    return new Promise<DeviceCheckResult>((resolve, reject) => {
      this.deviceCheck.check()
          .then(deviceCheckResult => {
              resolve(new SecurityCheckResult(deviceCheckResult, this.messageWhenSecure, this.messageWhenUnsecure, this.secureWhenFalse));
          }, error => { reject(error); });
    });
  }
}
