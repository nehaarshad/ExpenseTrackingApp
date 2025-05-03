// import React from 'react';
// import { Text } from 'react-native';
// import { ms } from '../../utils/scalingUtils';

// const ResponsiveText = ({ style, children, ...props }) => {
//   // Get the fontSize from style prop or default to 14
//   const fontSize = style?.fontSize ? ms(style.fontSize) : ms(14);
  
//   return (
//     <Text 
//       style={[style, { fontSize }]}  // Combine existing styles with scaled fontSize
//       {...props}                     // Pass all other props to Text
//     >
//       {children}
//     </Text>
//   );
// };

// export default ResponsiveText;