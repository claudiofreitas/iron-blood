import type { i18nText } from "~/models/types/common";
import classNames from "classnames"
import { useState } from "react";
import { getTrainLineBgColor, getTrainLineBorderColor } from "~/utils";

interface Props {
    label: i18nText
    lineColor: string
    numberOfStations: number
    isRidden: boolean
    isInterested: boolean
}
export default function TrainLineCard({label, lineColor, numberOfStations, isRidden, isInterested }: Props) {
  const [isRide, setIsRidden] = useState(isRidden);
  const [isInterest, setIsInterest] = useState(isInterested);
  return (
    <div>
      <div className={ classNames( "transition-colors rounded border border-gray-400 p-4 pb-0 bg-gradient-to-r", ( isRide && isInterest ) ? 'from-green-300 to-yellow-300' : isRide ? "from-green-300" : isInterest ? "from-yellow-300" : "bg-white" ) }>
        <div data-hint="top-info" className="flex gap-2">
          <div
            data-hint="line-color"
            className={ classNames( "h-20 w-6", getTrainLineBgColor(lineColor)  )}
          ></div>
          <div data-hint="line-label" className="flex flex-col">
            <label data-hint="jp" className="text-2xl">
                {label.ja}
            </label>
            <small data-hint="en" className="text-slate-500">
                {label.en}
            </small>
          </div>
          <div data-hint="line-stations" className="grow flex flex-col">
            <div
              data-hint="station-main-line"
              className={ classNames( "relative mb-1 flex h-1 w-full items-center justify-between rounded", getTrainLineBgColor(lineColor) ) }
            >
              {Array.from({ length: Math.min(15, numberOfStations) }).map((_, i) => (
                <div
                  key={i}
                  data-hint="station-circle "
                  className={classNames("h-2.5 w-2.5 rounded border-2 bg-white", getTrainLineBorderColor(lineColor))}
                ></div>
              ))}
            </div>
            <div className="flex justify-end">
              <small className="text-slate-400">{numberOfStations} stations</small>
            </div>
            <div className="grow flex justify-end items-end pb-4 gap-2">
              <span className="w-6 h-6 text-slate-600 icon-[ic--outline-train] active:scale-75 transition-transform" onClick={() => setIsRidden(true)}></span>
              <span className="w-6 h-6 text-slate-600 icon-[ic--round-bookmark-add] active:scale-75 transition-transform" onClick={() => setIsInterest(true)}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
