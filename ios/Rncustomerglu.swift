import CustomerGlu
let customerGlu = CustomerGlu.getInstance
@objc(Rncustomerglu)
class Rncustomerglu: NSObject {

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
    
    
    @objc
     static func requiresMainQueueSetup() -> Bool {
       return true
     }
}

