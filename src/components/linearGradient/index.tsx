import React, { FunctionComponent } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ViewStyle } from 'react-native';

interface KwLinearGradientInterface {
  children?: Element;
  colors: (string | number)[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  useAngle?: boolean;
  angleCenter?: { x: number; y: number };
  angle?: number;
  style?: ViewStyle;
}

export const KwLinearGradient: FunctionComponent<KwLinearGradientInterface> = (
  gradient: KwLinearGradientInterface,
) => (
  <LinearGradient
    start={gradient.start}
    end={gradient.end}
    angle={gradient.angle}
    colors={gradient.colors}
    style={[styles.linearGradient, gradient.style]}
    locations={gradient.locations}
    useAngle={gradient.useAngle}
    angleCenter={gradient.angleCenter}
  >
    {gradient.children}
  </LinearGradient>
);

KwLinearGradient.defaultProps = {
  start: { x: 0.1, y: 0 },
  end: { x: 0, y: 1.4 },
  angle: 18,
  colors: ['#FfFFFF', '#D7DDEF'],
  style: { flex: 1, paddingLeft: 15, paddingRight: 15, borderRadius: 5 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
