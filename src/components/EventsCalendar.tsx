import { useMemo, useState } from 'react'
import { EventCard } from './EventCard'
import {
  formatMonthLabel,
  getEventDateSet,
  getEventsByDate,
  getVisibleEvents,
  toISODate,
} from '../data/events'
import './EventsCalendar.css'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function buildMonthCells(year: number, monthIndex: number) {
  const firstWeekday = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const cells: Array<number | null> = Array.from(
    { length: firstWeekday },
    () => null,
  )

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day)
  }

  return cells
}

export function EventsCalendar() {
  const today = useMemo(() => new Date(), [])
  const [monthCursor, setMonthCursor] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const visibleEvents = getVisibleEvents()
  const eventDates = getEventDateSet()
  const todayISO = toISODate(today)
  const cells = buildMonthCells(monthCursor.year, monthCursor.month)
  const selectedEvents = selectedDate ? getEventsByDate(selectedDate) : []
  const monthLabel = formatMonthLabel(monthCursor.year, monthCursor.month)

  function shiftMonth(offset: number) {
    setSelectedDate(null)
    setMonthCursor((current) => {
      const next = new Date(current.year, current.month + offset, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  function isoForDay(day: number) {
    return toISODate(new Date(monthCursor.year, monthCursor.month, day))
  }

  return (
    <div className="events-cal">
      <div className="events-cal__header">
        <p className="events-cal__month">{monthLabel}</p>
        <div className="events-cal__nav">
          <button type="button" onClick={() => shiftMonth(-1)}>
            Previous month
          </button>
          <button type="button" onClick={() => shiftMonth(1)}>
            Next month
          </button>
        </div>
      </div>

      <div className="events-cal__weekdays" aria-hidden="true">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="events-cal__grid">
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="events-cal__empty" />
          }

          const iso = isoForDay(day)
          const hasEvents = eventDates.has(iso)
          const isToday = iso === todayISO
          const isSelected = iso === selectedDate
          const className = [
            'events-cal__day',
            hasEvents ? 'has-events' : '',
            isToday ? 'is-today' : '',
            isSelected ? 'is-selected' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={iso}
              type="button"
              className={className}
              aria-pressed={isSelected}
              aria-label={`${day} ${monthLabel}${isToday ? ', today' : ''}${hasEvents ? ', has events' : ''}`}
              onClick={() => setSelectedDate(iso)}
            >
              <span>{day}</span>
              {hasEvents ? <span className="events-cal__dot" /> : null}
            </button>
          )
        })}
      </div>

      {visibleEvents.length === 0 ? (
        <p className="events-cal__empty-copy events-cal__empty-copy--note">
          No events are currently scheduled.
        </p>
      ) : selectedDate ? (
        <div className="events-cal__selected">
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <EventCard key={event.id} event={event} compact />
            ))
          ) : (
            <p className="events-cal__empty-copy">No events on this date.</p>
          )}
        </div>
      ) : (
        <p className="events-cal__empty-copy">
          Select a highlighted date to see event details.
        </p>
      )}
    </div>
  )
}
