export default function ThinRangeBar({ value = 0, onChange, min = 0, max = 20 }) {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience Level: {value} years
        </label>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{min} yrs</span>
          <span>{max} yrs</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full appearance-none h-[3px] bg-gradient-to-r from-green-400 to-green-600 rounded-full outline-none cursor-pointer transition-all duration-200
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-green-500
            [&::-webkit-slider-thumb]:shadow
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-150
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border
            [&::-moz-range-thumb]:border-green-500
            [&::-moz-range-thumb]:shadow
          "
        />
      </div>
    );
  }
  