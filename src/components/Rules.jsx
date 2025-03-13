import React from 'react'

const Rules = () => {
  return (
    <div className="flex w-full max-w-4xl justify-center mb-4">
          <div className="nes-container with-title is-rounded bg-orange-100 p-4 shadow-lg max-w-xl is-centered">
            <div className="title text-amber-950">How to Play!</div>
            <ul className="text-amber-900 list-disc list-inside space-y-2 text-sm">
              <li>Each realm presents 10 trials, testing your wisdom and intuition.</li>
              <li>Every correct answer strengthens your spirit, earning you +3 energy points.</li>
              <li>A wrong choice drains your essence, costing -10 points and one heart.</li>
              <li>You begin your journey with 3 hearts—lose them all, and the veil consumes you.</li>
              <li>Only those who complete the trials shall unveil the path to destiny.</li>
              <li>Your fate shall be etched into the celestial records of the leaderboard.</li>
            </ul>
          </div>
        </div>
  )
}

export default Rules