import React from 'react';
import { ThemeConsumer } from '../../context/themeContext/ThemeContext';

const Note = () => (
  <ThemeConsumer>
    {({ themeChosen }) => (
      <div className={ `theme theme-${themeChosen}` }>
        I am lemon, hear me roar
      </div>
    )}

  </ThemeConsumer>
);

export default Note;