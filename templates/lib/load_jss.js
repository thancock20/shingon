import jss from 'jss';
import preset from 'jss-preset-default';

export default (styles, global = false) => {
  jss.setup(preset());

  const sheet = jss.createStyleSheet(styles, { named: !global });
  return sheet.attach();
}
