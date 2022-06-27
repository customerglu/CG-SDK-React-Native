import Foundation
import CustomerGlu
import UIKit
import React


let customerGlu = CustomerGlu.getInstance
@objc(Rncustomerglu)
class Rncustomerglu: NSObject{

    @objc func registerDevice() -> Void {
        var userData = [String: AnyHashable]()
                        userData["userId"] = "test-08mar-17"
                        userData["userName"] = ""
       
        customerGlu.registerDevice(userdata: userData,loadcampaigns: true) { success, registrationModel in
                                if success {
                                   print("Register Successfully \(String(describing: registrationModel))")
                                } else {
                                    print("error")
                                }
                            }
    }
    
    
    @objc(dataClear)
    func dataClear() -> Void {
        customerGlu.clearGluData();
        print("Data cleared");
    }

    @objc
    func sendData(_ property:NSDictionary) -> Void {
        customerGlu.sendEventData(eventName: property["eventName"] as! String , eventProperties: property["eventProperties"] as? [String : Any])
        print(property["eventName"] as Any)
        print(property["eventProperties"] as Any)
        
        
    }

    @objc(openWallet)
    func openWallet() -> Void {
        customerGlu.openWallet()
    }
    @objc
    func loadCampaignIdBy(_ id:String) -> Void {
        customerGlu.loadCampaignById(campaign_id: id)
    }
    
    @objc
    func enableAnalytic(_ bool:Bool) -> Void {
        customerGlu.enableAnalyticsEvent(event: bool)
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: Notification.Name("CUSTOMERGLU_ANALYTICS_EVENT").rawValue), object: nil, userInfo: nil)
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.catchAnalyticsNotification(notification:)), name: Notification.Name("CUSTOMERGLU_ANALYTICS_EVENT"), object: nil)
       
    }
    @objc func catchAnalyticsNotification(notification: NSNotification) {
                print("Hello Analytics")
    }
    
    @objc func disableGluSdk(_ bool:Bool) -> Void {
        customerGlu.disableGluSdk(disable: bool)
        print(bool);
    }

    @objc
    func configureLoaderColour(_ colr: String) -> Void {
        print(colr);
        let color = colorWithHexString(hexString: colr )
        print(color);
        customerGlu.configureLoaderColour(color: [color])
    }
    
    @objc
    func enablePrecaching() -> Void {
        print("enablePrecaching");
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
        let userInfo = ["name": "khushbu"]
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: Notification.Name("CUSTOMERGLU_DEEPLINK_EVENT").rawValue), object: nil, userInfo: userInfo)
  
        NotificationCenter.default.addObserver(self, selector: #selector(self.catchDeeplinkNotification(notification:)), name: Notification.Name("CUSTOMERGLU_DEEPLINK_EVENT"), object: nil)
    }
        
    
    @objc
    func catchDeeplinkNotification(notification: NSNotification) {
            //do stuff using the userInfo property of the notification object
            if let userInfo = notification.userInfo as? [String: Any] // or use if you know the type  [AnyHashable : Any]
            {
                 print(userInfo)
            }
        }

    @objc
    func isFcmApn(_ fcm:String) -> Void {
        customerGlu.isFcmApn(fcmApn:fcm)
    }
  
    @objc
    func configureSafeArea(_ safe:NSDictionary) -> Void {
        print(safe["bottomHeight"] as Any);
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
    func UpdateProfile() -> Void {
        var userData = [String: AnyHashable]()
                        userData["userId"] = "test-08mar-17"
                        userData["userName"] = ""
        customerGlu.updateProfile(userdata: userData) { success, registrationModel in
            if success {
               print("Update Successfully \(String(describing: registrationModel))")
            } else {
                print("error")
            }
        }
    }
    
    @objc
    func DisplayCustomerGluNotification() -> Void {
       print("This will work on android")

    }

    @objc
    func CGApplication() -> Void {

    }

    @objc
    func DisplayBackGroundNotification() -> Void {
        print("DisplayBackGroundNotification");
    }
    
    @objc
    func GetRefferalId(_ url:URL) -> Void {
       let refferId =  customerGlu.getReferralId(deepLink: url)
        print(refferId);
    }
    
    @objc
    func LoadAllCampagins() -> Void {
        DispatchQueue.main.async {
        customerGlu.loadAllCampaigns()
        }
    }
    
    @objc
    func LoadCampaginsByFilter(_ obj:NSDictionary) -> Void {
        print(obj);
        DispatchQueue.main.async {
        customerGlu.loadCampaignByFilter(parameters: obj)
        }
    }
    
    @objc
    func SetCurrentClassName(_ clName:String) -> Void {
        print(clName)
        customerGlu.setCurrentClassName(className: clName)
    }
    
    @objc
    func OpenWalletWithUrl(_ url:String) -> Void {
        DispatchQueue.main.async {
        customerGlu.openWalletWithURL(url: url)
        }
    }
    
    
    @objc
    func configureWhiteListedDomains() -> Void {
        print("configureWhiteListedDomains")
        
    }
    
    @objc
    func configureDomainCodeMsg() -> Void {
        print("configureDomainCodeMsg")
    }
        
    
    @objc
     static func requiresMainQueueSetup() -> Bool {
       return true
     }
    
    @objc
    func constantsToExport() -> [String: Any]! {
      return ["someKey": "someValue"]
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

