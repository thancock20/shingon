import jss from 'jss';
import preset from 'jss-preset-default';

export default (styles) => {
  jss.setup(preset());

  const sheet = jss.createStyleSheet(styles, { named: false });
  sheet.attach();
}
