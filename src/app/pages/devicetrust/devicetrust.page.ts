import {Component, OnInit} from '@angular/core';
import {CheckResultMetrics, DeviceCheckResult, DeviceCheckType, SecurityService} from '@aerogear/security';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import {Platform} from '@ionic/angular';
import {MetricsService} from '@aerogear/core';
import {OpenShiftService, Service} from '../../services/openshift.service';
import { SecurityCheck, SecurityCheckResult } from './SecurityCheck';

declare var navigator: any;
@Component({
    selector: 'devicetrust',
    templateUrl: './devicetrust.page.html',
    styleUrls: ['./devicetrust.page.scss'],
})
export class DeviceTrustPage implements OnInit {
  private static readonly METRICS_KEY = 'security';
  public detections: Array<{ label: string, detected: boolean }>;
  public trustScore: number;
  public totalTests: number;
  public totalDetections: number;
  public totalPassed: number;
  public icon: string;
  public color: string;
  public securityService: SecurityService;
  private readonly metricService: MetricsService;

  constructor(public platform: Platform,
              private dialogs: Dialogs,
              private openShift: OpenShiftService) {
      this.metricService = new MetricsService({ configuration: openShift.getConfiguration(Service.Metrics) });
      this.securityService = new SecurityService(this.metricService);
  }

  ngOnInit() {
  }

  public isAvailable() {
      return this.platform.is('cordova');
  }

  private async performChecksAndPublishMetrics(): Promise<DeviceCheckResult[]> {
    const res = await this.securityService.checkMany(
      new SecurityCheck(DeviceCheckType.debugModeEnabled, 'No Debugger Detected', 'Debugger Detected', true),
      new SecurityCheck(DeviceCheckType.rootEnabled, 'No Root Access Detected', 'Root Access Detected', true),
      new SecurityCheck(DeviceCheckType.isEmulator, 'No Emulator Access Detected', 'Emulator Access Detected', true),
      new SecurityCheck(DeviceCheckType.screenLockEnabled, 'Device Lock Enabled', 'No Device Lock Enabled'));
      this.metricService.publish(DeviceTrustPage.METRICS_KEY, [ new CheckResultMetrics(res) ]);
    return res;
  }

  public addDetection(checkResult: SecurityCheckResult) {
    this.totalTests++;

    if (checkResult.passed) {
      this.totalPassed++;
    } else {
      this.totalDetections++;
    }

    this.detections.push({ label: checkResult.getLabel(), detected: checkResult.passed });
    this.trustScore = Number((100 - (((this.totalDetections / this.totalTests) * 100))).toFixed());
  }

  private async runChecks(): Promise<any> {
    this.detections = [];
    this.trustScore = 0;
    this.totalTests = 0;
    this.totalDetections = 0;
    this.totalPassed = 0;

    const deviceCheckResults = await this.performChecksAndPublishMetrics();
    for (let i = 0; deviceCheckResults && i < deviceCheckResults.length; i++) {
      this.addDetection(deviceCheckResults[i] as SecurityCheckResult);
    }
  }

  public ionViewWillEnter(): void {
    if (this.isAvailable()) {
      this.runChecks();
    }
  }
}
