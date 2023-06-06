/**
 * Application Based Colors
 */

export const colors = {
  app: {
    // primary: '#4D76C1',
    primary: '#0A8791',
    primaryOrange: '#FBA83C',
    secondary: '#F3F5F7',
    tertiary: '#DCDEFE',
    backgroundGrey: '#D8D8D8',
    backgroundGrey_1: '#B8C0CF',
    grey: '#F8FAFF',
    pinkLight: '#FF8EA3',
    greenLight: '#78D5C0',
    lightpurple: '#ECEAFC',
    darkBlue: '#224C98',
    secondaryGrey: '#E9F0FB',
    tertiaryGrey: '#899198',
    quaternaryGrey: '#979797',
    purpleLight: '#959ABF',
    white: '#FDFEFF',
    black: '#000000',
    success: '#34D84E',
    blue: '#108ED6',
    danger: '#ED1C24',
    darkDanger: '#B71C1C',
    notificationCount: '#FF2626',
    borderColor: '#E8E8F1',
    quinaryGrey: '#E0E3EF',
    lightGrey: '#9B9B9B',
    backgroundStories: 'rgba(255, 255, 255, 0.7)',
    orange: '#ECA400',
    backgroundQuizUser: 'rgba(255, 255, 255, 0.4)',
    online: '#84C857',
    backgroundCopies: '#FFEBF0',
    greyLight: '#D6D6D6',
    lightBlue: '#9FA9C0',
    lightBluePrice: '#6C8DC9',
    lightPinkPrice: '#FFA5B6',
    lightGreenPrice: '#A0E9D8',
    lightYellow: '#FBCB22',
    backgrounfGray: '#F2F2F2',
    borderInputColor: '#CFCFD5',
  },
  text: {
    primary: '#000000',
    blue: '#4D76C1',
    secondary: '#7F8081',
    pinkLight: '#FF8EA3',
    greenLight: '#78D5C0',
    lightYellow: '#FBCB22',
    grey: '#B0B0B0',
    secondaryGrey: '#F1F3FC',
    tertiaryGrey: '#899198',
    white: '#FDFEFF',
    black: '#000000',
    success: '#34D84E',
    danger: '#ED1C24',
    notificationCount: '#FF2626',
    lightGrey: '#9B9B9B',
    copiesColors: '#FF6905',
    lightGray: '#8A8A8A',
    headerColor: '#171939',
    numberCount: '#B8B8D2',
  },
};

export const convertHexToRGB = (hex: string, opacity: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (opacity) {
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

export const convertRGBToHex = (r: string, g: string, b: string) =>
  `#${[r, g, b].map((x) => x.toString().padStart(2, '0')).join('')}`;
