import React from "react";
import {EuiCard, EuiFlexItem, EuiIcon} from '@elastic/eui'
interface GraphsComponentProps {}
const GraphsComponent: React.FC<GraphsComponentProps> = () => {
//elasticsearch_cluster_health_status{cluster="elastdocker-cluster",color="green"} 0
  return(<>
    <EuiFlexItem key={'metrics--index'}>
      <EuiCard
        icon={<EuiIcon size="xxl" type={`visArea`} />}
        title={`Aerocloud Metrics`}
        isDisabled={false}
        description="Aerocloud Metrics, WIP"
        onClick={() => {}}
      />
    </EuiFlexItem>
  </>);
};

export default GraphsComponent;
