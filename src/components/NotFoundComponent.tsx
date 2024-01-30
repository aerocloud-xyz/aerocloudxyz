import { EuiEmptyPrompt } from '@elastic/eui';
import React from 'react';
import { centerVerticallyAndHorizontally } from '../utils/usefulStyles';

interface props {}
const NotFoundComponent: React.FC<props> = () => {
    return (
    <>
        <EuiEmptyPrompt
            title={<h2>404</h2>}
            color={"subdued"}
            body={
              <p>
                Not found, better luck next time!
              </p>
            }
            style={centerVerticallyAndHorizontally}
          ></EuiEmptyPrompt>
    </>)

}
export default NotFoundComponent;