import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface BannerWidgetProps extends ViewProps {
  bannerId: string;
}

export default codegenNativeComponent<BannerWidgetProps>(
  'BannerWidget'
) as HostComponent<BannerWidgetProps>;
