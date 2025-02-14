import type { ViewProps } from 'react-native';
import type { HostComponent } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export interface EmbedBannerWidgetProps extends ViewProps {
  bannerId: string;
}

export default codegenNativeComponent<EmbedBannerWidgetProps>(
  'EmbedBannerWidget'
) as HostComponent<EmbedBannerWidgetProps>;
