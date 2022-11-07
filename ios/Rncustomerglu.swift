import Foundation
import CustomerGlu
import UIKit
import React

let customerGlu = CustomerGlu.getInstance
extension Double {
    func roundToDecimal(_ fractionDigits: Int) -> Double {
        let multiplier = pow(10, Double(fractionDigits))
        return Darwin.round(self * multiplier) / multiplier
    }
}
@objc(Rncustomerglu)
class Rncustomerglu: RCTEventEmitter{
    static var shared:Rncustomerglu?
    
    private var supportedEventNames: Set<String> = ["CUSTOMERGLU_ANALYTICS_EVENT","CUSTOMERGLU_DEEPLINK_EVENT","CGBANNER_FINAL_HEIGHT","CUSTOMERGLU_BANNER_LOADED","CGEMBED_FINAL_HEIGHT","CG_INVALID_CAMPAIGN_ID"]
    private var hasAttachedListener = true
    
    
    
    override init() {
        super.init()
        Rncustomerglu.shared = self
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.catchAnalyticsNotification(notification:)), name: Notification.Name("CUSTOMERGLU_ANALYTICS_EVENT"), object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.catchAnalyticsNotification(notification:)), name: Notification.Name("CUSTOMERGLU_DEEPLINK_EVENT"), object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.catchAnalyticsNotification(notification:)), name: Notification.Name("CUSTOMERGLU_BANNER_LOADED"), object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.catchAnalyticsNotification(notification:)), name: Notification.Name("CG_INVALID_CAMPAIGN_ID"), object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.catchAnalyticsNotification(notification:)), name: Notification.Name("CGBANNER_FINAL_HEIGHT"), object: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.catchAnalyticsNotification(notification:)), name: Notification.Name("CGEMBED_FINAL_HEIGHT"), object: nil)
        
        setPlatformAndSdkVersion()
    }
    func setPlatformAndSdkVersion(){

        CustomerGlu.app_platform="REACT_NATIVE"
        CustomerGlu.sdk_version="1.1.0"
    }
    
    override func startObserving() {
        hasAttachedListener = true
    }
    override func stopObserving() {
        hasAttachedListener = false
    }
    
    // Must return an array of the supported events. Any unsupported events will throw errors
    // if they are passed in to `sendEvent`
    override func supportedEvents() -> [String] {
        return Array(supportedEventNames)
    }
    
    
    func emitEvent(withName name: String, body: Any!) {
        if hasAttachedListener && supportedEventNames.contains(name) {
            print("3rd notification call");
            sendEvent(withName: name, body: body)
        }
    }
    
    
    @objc func registerDevice(_ userdata:NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock,  rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        customerGlu.registerDevice(userdata: userdata as! [String : AnyHashable]) { success in
            if success {
                resolve(true)
            } else {
                resolve(false)
            }
        }
    }
    
    @objc func OpenNudgeRN(_ id:String, nudgeconfigdata nudgeData:NSDictionary) -> Void {
        
        let nudgeconfigData=CGNudgeConfiguration()
        var nudgeconfig:NSDictionary;
        
        if((nudgeData["nudgeConfiguration"]) != nil){
            nudgeconfig=nudgeData["nudgeConfiguration"] as! NSDictionary
            nudgeconfigData.layout=nudgeconfig["layout"] as? String ?? "full-default"
            nudgeconfigData.opacity=nudgeconfig["opacity"] as? Double ?? Double(nudgeconfig["opacity"] as? String ?? "0.0")!
            nudgeconfigData.closeOnDeepLink=nudgeconfig["closeOnDeepLink"] as? Bool ?? false
            nudgeconfigData.relativeHeight=nudgeconfig["relativeHeight"] as? Double ?? Double(nudgeconfig["relativeHeight"] as? String ?? "0.0")!
            nudgeconfigData.absoluteHeight=nudgeconfig["absoluteHeight"] as? Double ?? Double(nudgeconfig["absoluteHeight"] as? String ?? "0.0")!
            
        }
        
        customerGlu.openNudge(nudgeId: id,nudgeConfiguration:nudgeconfigData)
        
    }
    
    
    @objc(dataClear)
    func dataClear() -> Void {
        DispatchQueue.main.async {
            customerGlu.clearGluData();
        }
    }
    
    @objc
    func sendData(_ property:NSDictionary) -> Void {
        customerGlu.sendEventData(eventName: property["eventName"] as! String , eventProperties: property["eventProperties"] as? [String : Any])
    }
    
    @objc
    func openWallet(_ walletData:NSDictionary) -> Void {
        print("walletData--",walletData)
        let nudgeconfigData=CGNudgeConfiguration()
        var nudgeconfig:NSDictionary;
        if((walletData["nudgeConfiguration"]) != nil){
            
            nudgeconfig=walletData["nudgeConfiguration"] as! NSDictionary
            nudgeconfigData.layout=nudgeconfig["layout"] as? String ?? "full-default"
            nudgeconfigData.opacity=nudgeconfig["opacity"] as? Double ?? Double(nudgeconfig["opacity"] as? String ?? "0.0")!
            nudgeconfigData.closeOnDeepLink=nudgeconfig["closeOnDeepLink"] as? Bool ?? false
            nudgeconfigData.relativeHeight=nudgeconfig["relativeHeight"] as? Double ?? Double(nudgeconfig["relativeHeight"] as? String ?? "0.0")!
            nudgeconfigData.absoluteHeight=nudgeconfig["absoluteHeight"] as? Double ?? Double(nudgeconfig["absoluteHeight"] as? String ?? "0.0")!

            

        }
        customerGlu.openWallet(nudgeConfiguration: nudgeconfigData)
        //        customerGlu.openWallet(auto_close_webview: bool)
    }
    
    
    @objc
    func loadCampaignById(_ id:String, nudgeconfigdata nudgeData:NSDictionary) -> Void {
        print("loadCampaignById--",id,nudgeData)
        let nudgeconfigData=CGNudgeConfiguration()
        var nudgeconfig:NSDictionary;
        if((nudgeData["nudgeConfiguration"]) != nil){
            
            nudgeconfig=nudgeData["nudgeConfiguration"] as! NSDictionary
            nudgeconfigData.layout=nudgeconfig["layout"] as? String ?? "full-default"
            nudgeconfigData.opacity=nudgeconfig["opacity"] as? Double ?? Double(nudgeconfig["opacity"] as? String ?? "0.0")!
            nudgeconfigData.closeOnDeepLink=nudgeconfig["closeOnDeepLink"] as? Bool ?? false
            nudgeconfigData.relativeHeight=nudgeconfig["relativeHeight"] as? Double ?? Double(nudgeconfig["relativeHeight"] as? String ?? "0.0")!
            nudgeconfigData.absoluteHeight=nudgeconfig["absoluteHeight"] as? Double ?? Double(nudgeconfig["absoluteHeight"] as? String ?? "0.0")!
            
        }
        customerGlu.loadCampaignById(campaign_id:id, nudgeConfiguration: nudgeconfigData)
        //        customerGlu.loadCampaignById(campaign_id: id, auto_close_webview: bool)
    }
    
    @objc
    func enableAnalytic(_ bool:Bool) -> Void {
        customerGlu.enableAnalyticsEvent(event: bool)
    }
    @objc func catchAnalyticsNotification(notification: NSNotification) {
        if("CGBANNER_FINAL_HEIGHT" == notification.name.rawValue){
            let height =  CustomerGlu.bannersHeight
            Rncustomerglu.shared?.emitEvent(withName: notification.name.rawValue, body: height)
        }else if("CGEMBED_FINAL_HEIGHT" == notification.name.rawValue){
            if let userInfo = notification.userInfo as? [String: Any]
            {
                print(userInfo)
                let height =  CustomerGlu.embedsHeight
                Rncustomerglu.shared?.emitEvent(withName: notification.name.rawValue, body: userInfo)
            }
           
        }else{
            Rncustomerglu.shared?.emitEvent(withName: notification.name.rawValue, body: notification.userInfo)
        }
        let userInfo = notification.userInfo as? [String: Any]
        print("userinfo------",userInfo)
    }
    
    @objc func disableGluSdk(_ bool:Bool) -> Void {
        customerGlu.disableGluSdk(disable: bool)
    }
    
    @objc
    func configureLoaderColour(_ colr: String) -> Void {
        let color = colorWithHexString(hexString: colr )
        customerGlu.configureLoaderColour(color: [color])
    }
    
    @objc
    func enablePrecaching() -> Void {
        
    }
    
    
    @objc
    func gluSDKDebuggingMode(_ bool:Bool) -> Void {
        customerGlu.gluSDKDebuggingMode(enabled: bool)
        print(bool);
    }
    
    @objc
    func enableEntryPoints(_ bool:Bool) -> Void {
        customerGlu.enableEntryPoints(enabled:bool)
        print(bool);
    }
    
    
    @objc
    func closeWebView(_ bool:Bool) -> Void {
        customerGlu.closeWebviewOnDeeplinkEvent(close: bool);
        
    }
    
    
    
    @objc
    func isFcmApn(_ fcm:String) -> Void {
        customerGlu.isFcmApn(fcmApn:fcm)
    }
    
    @objc
    func setApnFcmToken(_ apn:String, fcmToken fcm: String ) -> Void {
        customerGlu.apnToken=apn
        customerGlu.fcmToken=fcm
    }
    
    
    @objc
    func configureSafeArea(_ safe:NSDictionary) -> Void {
        let color1 = colorWithHexString(hexString: safe["topSafeAreaColor"] as! String )
        let color2 = colorWithHexString(hexString: safe["bottomSafeAreaColor"] as! String )
        customerGlu.configureSafeArea(topHeight: safe["topHeight"] as! Int, bottomHeight: safe["bottomHeight"] as! Int, topSafeAreaColor: color1, bottomSafeAreaColor: color2)
    }
    
    
    @objc
    func SetDefaultBannerImage(_ url: String) -> Void {
        DispatchQueue.main.async {
            customerGlu.setDefaultBannerImage(bannerUrl: url)
        }
    }
    
    
    @objc
    func UpdateProfile(_ userdata:NSDictionary, resolver resolve: @escaping RCTPromiseResolveBlock,  rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        customerGlu.updateProfile(userdata: userdata as! [String : AnyHashable]) { success in
            if success {
            } else {
            }
        }
    }
    
    @objc
    func DisplayCustomerGluNotification() -> Void {
        
    }
    
    
    
    @objc
    func CGApplication(_ userInfo:NSDictionary) -> Void {
        func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
            // autoclosewebview - If True then it will dismiss the webview on Deeplink Event.
            CustomerGlu.getInstance.cgapplication(application, didReceiveRemoteNotification: userInfo, backgroundAlpha: 0.5 ,auto_close_webview:false,fetchCompletionHandler: completionHandler)     }
    }
    
    @objc func DisplayCGNotification(_ obj:NSDictionary, auto_close_webview bool:Bool) -> Void {
        DispatchQueue.main.async {
            customerGlu.displayBackgroundNotification(remoteMessage: obj as! [String : AnyHashable], auto_close_webview:bool)
            
        }
    }
    
    @objc
    func GetRefferalId(_ url:URL, resolver resolve: @escaping RCTPromiseResolveBlock,  rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        let refferId =  customerGlu.getReferralId(deepLink: url)
        resolve(refferId)
    }
    
    @objc
    func LoadAllCampagins() -> Void {
        DispatchQueue.main.async {
            customerGlu.loadAllCampaigns()
        }
    }
    
    @objc
    func LoadCampaginsByFilter(_ obj:NSDictionary) -> Void {
        DispatchQueue.main.async {
            customerGlu.loadCampaignByFilter(parameters: obj)
        }
    }
    
    @objc
    func SetCurrentClassName(_ clName:String) -> Void {
        DispatchQueue.main.async {
            customerGlu.setCurrentClassName(className: clName)
        }
    }
    
    
    
    @objc
    func configureWhiteListedDomains(_ domain:NSArray) -> Void {
        customerGlu.configureWhiteListedDomains(domains: domain as! [String])
        
    }
    
    @objc
    func configureDomainCodeMsg(_ codemsg: NSDictionary) -> Void {
        customerGlu.configureDomainCodeMsg(code: codemsg["code"] as! Int, message: codemsg["msg"] as! String)
    }
    
    @objc
    func getBannerHeight() {
        //           NotificationCenter.default.addObserver(self, selector: #selector(self.catchBannerHeightNotification(notification:)), name: Notification.Name("CGBANNER_FINAL_HEIGHT"), object: nil)
        
    }
    
    //       @objc
    //       func catchBannerHeightNotification(notification: NSNotification) {
    //
    //       }
    
    
    override class func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    
    
    private func colorWithHexString(hexString: String) -> UIColor {
        
        // Convert hex string to an integer
        
        let hexint = Int(self.intFromHexString(hexStr: hexString))
        
        let red = CGFloat((hexint & 0xff0000) >> 16) / 255.0
        
        let green = CGFloat((hexint & 0xff00) >> 8) / 255.0
        
        let blue = CGFloat((hexint & 0xff) >> 0) / 255.0
        
        // Create color object, specifying alpha as well
        
        let color = UIColor(red: red, green: green, blue: blue, alpha: 1.0)
        
        return color
        
    }
    
    
    
    private func intFromHexString(hexStr: String) -> UInt32 {
        
        var hexInt: UInt32 = 0
        
        // Create scanner
        
        let scanner: Scanner = Scanner(string: hexStr)
        
        // Tell scanner to skip the # character
        
        scanner.charactersToBeSkipped = CharacterSet(charactersIn: "#")
        
        // Scan hex value
        
        scanner.scanHexInt32(&hexInt)
        
        return hexInt
        
    }
    
}




@objc(BannerWidget)
class BannerWidget: RCTViewManager {
    override func view() -> UIView! {
        return MyNativeView()
    }
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}


@objc(EmbedBannerWidget)
class EmbedBannerWidget: RCTViewManager {
    override func view() -> UIView! {
        return EmbedBannerView()
    }
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

// Custom View (Swift)
@objc
class MyNativeView: UIView {
    @objc var bannerId = "" {
        didSet {
            DispatchQueue.main.asyncAfter(deadline: .now()) { [self] in
                let bannerview = BannerView(frame: CGRect(x: 10, y: 0, width: UIScreen.main.bounds.width - 20  , height: 0), bannerId: bannerId)
                self.addSubview(bannerview)
            }
        }
    }
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

@objc
class EmbedBannerView: UIView {
    @objc var bannerId = "" {
        didSet {
            DispatchQueue.main.asyncAfter(deadline: .now()) { [self] in
                let bannerview = CGEmbedView(frame: CGRect(x: 10, y: 0, width: UIScreen.main.bounds.width - 20  , height: 0), embedId: bannerId)
                self.addSubview(bannerview)
            }
        }
    }
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

