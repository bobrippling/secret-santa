import React from 'react';

type Props = {
    name: string;
  };

const App: React.FC<Props> = (props : Props) => (
    <div>
        {`App ${props.name}`}
    </div>
);

export default App;
