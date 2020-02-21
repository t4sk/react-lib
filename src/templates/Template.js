import React from "react";
import PropTypes from "prop-types";
import styles from "./Template.module.css";

export function Template(props) {
  return (
    <div className={styles.component}>
      <div>foo</div>
    </div>
  );
}

Template.propTypes = {
  bar: PropTypes.string.isRequired
};

export default Template;
