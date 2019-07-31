import React from "react"
import PropTypes from "prop-types"
import { Button, Label } from "semantic-ui-react"

const PROPS = {
  size: "mini",
  basic: true,
}

export function PaginationButtons(props) {
  const { count, skip, limit, onChangePage } = props

  const total = Math.max(Math.ceil(count / limit), 1)
  const current = Math.floor(skip / limit) + 1

  return (
    <div>
      <Button
        {...PROPS}
        disabled={current == 1}
        onClick={() => onChangePage(1)}
      >
        First
      </Button>

      <Button
        {...PROPS}
        disabled={current == 1}
        icon="chevron left"
        onClick={() => onChangePage(current - 1)}
      />

      <Label basic>
        <div>
          Page {current} of {total}
        </div>
      </Label>

      <Button
        {...PROPS}
        disabled={current == total}
        icon="chevron right"
        onClick={() => onChangePage(current + 1)}
      />
      <Button
        {...PROPS}
        disabled={current == total}
        onClick={() => onChangePage(total)}
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
  onChangePage: PropTypes.func.isRequired,
}

export default PaginationButtons
