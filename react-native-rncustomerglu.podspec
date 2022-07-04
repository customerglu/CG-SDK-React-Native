require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-rncustomerglu"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description = <<-DESC
Customerglu React-Native SDK
DESC
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.source       = { :git => "https://github.com/nehagupta1995/Awesome.git", :tag => "#{s.version}" }
  s.source_files = "ios/**/*"
  s.dependency "React-Core"
  s.dependency "CustomerGlu", "2.0.4"
  s.platform = :ios, '11.0'
  s.swift_version = '5.0'

  
end
