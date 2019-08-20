// 0.1.0
import React from "react"
import PropTypes from "prop-types"
import { Button, Label } from "semantic-ui-react"
import styles from "./PaginationButtons.module.css"

const BUTTON_PROPS = {
  size: "mini",
  basic: true,
}

export function PaginationButtons(props) {
  const { count, skip, limit } = props

  const total = Math.max(Math.ceil(count / limit), 1)
  const current = Math.floor(skip / limit) + 1

  function onClick(page) {
    props.onClick({
      page,
      skip: (page - 1) * limit,
    })
  }

  return (
    <div className={styles.component}>
      <Button
        {...BUTTON_PROPS}
        disabled={current == 1}
        onClick={() => onClick(1)}
      >
        First
      </Button>

      <Button
        {...BUTTON_PROPS}
        disabled={current == 1}
        icon="chevron left"
        onClick={() => onClick(current - 1)}
      />

      <Label basic>
        <div>
          {(skip + 1).toLocaleString()}-
          {Math.min(skip + limit, count).toLocaleString()} of{" "}
          {count.toLocaleString()}
        </div>
      </Label>

      <Button
        {...BUTTON_PROPS}
        disabled={current == total}
        icon="chevron right"
        onClick={() => onClick(current + 1)}
      />
      <Button
        {...BUTTON_PROPS}
        disabled={current == total}
        onClick={() => onClick(total)}
      >
        Last
      </Button>
    </div>
  )
}

PaginationButtons.propTypes = {
  count: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default PaginationButtons
