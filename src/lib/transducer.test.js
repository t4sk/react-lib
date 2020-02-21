import { compose } from "./util"
import { transduce, map, filter, append } from "./transducer"

describe("transduce", () => {
  const arr = [1, 2, 3, 4, 5]

  test("map to array", () => {
    const res = transduce(
      compose(
        map(x => x + 1),
        filter(x => x % 2 == 0)
      ),
      append,
      [],
      arr
    )

    expect(res).toEqual([2, 4, 6])
  })
  test("sum", () => {
    function add(sum, x) {
      return sum + x
    }

    const res = transduce(
      compose(
        map(x => x + 1),
        filter(x => x % 2 == 0)
      ),
      add,
      0,
      arr
    )

    expect(res).toEqual(12)
  })
})
