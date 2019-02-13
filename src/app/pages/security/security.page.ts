import { Component, OnInit } from '@angular/core';
import { DeviceCheckResult, DeviceCheckType, SecurityService } from '@aerogear/security';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Platform } from '@ionic/angular';

declare var navigator: any;
@Component({
    selector: 'app-security',
    templateUrl: './security.page.html',
    styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {
    public detections: Array<{ label: string, detected: boolean }>;
    public trustScore: number;
    public totalTests: number;
    public totalDetections: number;
    public totalPassed: number;
    public icon: string;
    public color: string;
    public securityService: SecurityService;

    constructor(public platform: Platform, private dialogs: Dialogs) {
        this.securityService = new SecurityService();
    }

    ngOnInit() {
    }

    public isAvailable() {
        return this.platform.is('ios') || this.platform.is('android');
    }

    public performChecks(): Promise<any> {
        return Promise.all<DeviceCheckResult>([
            this.detectDeviceLock(),
            this.detectRoot(),
            this.detectEmulator(),
            this.detectDebug()]);
    }

    public performChecksAndPublishMetrics(): Promise<DeviceCheckResult[]> {
        return this.securityService.checkManyAndPublishMetric(DeviceCheckType.debugModeEnabled,
            DeviceCheckType.rootEnabled,
            DeviceCheckType.isEmulator,
            DeviceCheckType.screenLockEnabled);
    }

    public addDetection(label: string, isSecure: boolean) {
        this.totalTests++;

        if (!isSecure) {
            this.totalDetections++;
        }

        if (isSecure) { this.totalPassed++; }

        this.detections.push({ label, detected: isSecure });
        this.trustScore = Number((100 - (((this.totalDetections / this.totalTests) * 100))).toFixed());
    }

    // Detect if the device is running on an emulator.
    public detectEmulator(): Promise<any> {
        return this.securityService.check(DeviceCheckType.isEmulator)
            .then((isEmulated: DeviceCheckResult) => {
                const emulatedMsg = isEmulated.passed ? 'Emulator Access Detected' : 'No Emulator Access Detected';
                this.addDetection(emulatedMsg, !isEmulated.passed);
            }).catch((err: Error) => console.error(err));
    }

    // Detect if the device is running Root.
    public detectRoot(): Promise<any> {
        return this.securityService.check(DeviceCheckType.rootEnabled)
            .then((isRooted: DeviceCheckResult) => {
                const rootedMsg = isRooted.passed ? 'Root Access Detected' : 'No Root Access Detected';
                this.addDetection(rootedMsg, !isRooted.passed);
            }).catch((err: Error) => console.error(err));
    }

    // Detect if the app is running in debug mode.
    public detectDebug(): Promise<any> {
        return this.securityService.check(DeviceCheckType.debugModeEnabled)
            .then((isDebugger: DeviceCheckResult) => {
                const debuggerMsg = isDebugger.passed ? 'Debugger Detected' : 'No Debugger Detected';
                this.addDetection(debuggerMsg, !isDebugger.passed);
            }).catch((err: Error) => console.error(err));
    }

    // Detect if a system device lock is set.
    public detectDeviceLock(): Promise<any> {
        return this.securityService.check(DeviceCheckType.screenLockEnabled)
            .then((deviceLockEnabled: DeviceCheckResult) => {
                const deviceLockMsg = deviceLockEnabled.passed ? 'Device Lock Enabled' : 'No Device Lock Enabled';
                this.addDetection(deviceLockMsg, deviceLockEnabled.passed);
            });
    }

    public refreshChecks(): void {
        this.ionViewWillEnter();
    }

    public checkDialog(trustScore: number): void {
        if (trustScore < 70) {
            this.dialogs.confirm(
                `Your current trust score ${trustScore}% is below the specified target of 70%,` +
                ` do you want to continue or exit the app?`,
                'Warning',
                ['Exit', 'Continue'],
            ).then((result) => {
                if (result === 1) {
                    navigator.app.exitApp();
                }
            });
        }
    }

    public ionViewWillEnter(): void {
        this.detections = [];
        this.trustScore = 0;
        this.totalTests = 0;
        this.totalDetections = 0;
        this.totalPassed = 0;
        this.performChecks().then(() => {
            this.checkDialog(this.trustScore);
        });
        this.performChecksAndPublishMetrics();
    }
}
