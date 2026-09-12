import { useMemo, useState } from 'react'
import { EventCard } from './EventCard'
import { EventDetailsDialog } from './EventDetailsDialog'
import {
  formatMonthLabel,
  getEventDateSet,
  getEventsByDate,
  getVisibleEvents,
  parseISODate,
  toISODate,
  type GemaEvent,
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

function getCalendarStart(today: Date) {
  const upcoming = getVisibleEvents()
  const year = today.getFullYear()
  const month = today.getMonth()
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const inThisMonth = upcoming.filter((event) =>
    Boolean(event.date && event.date.startsWith(monthPrefix)),
  )

  if (inThisMonth.length > 0 && inThisMonth[0].date) {
    return {
      year,
      month,
      selectedDate: inThisMonth[0].date,
    }
  }

  const nextEvent = upcoming.find((event) => event.date)
  if (nextEvent?.date) {
    const next = parseISODate(nextEvent.date)
    return {
      year: next.getFullYear(),
      month: next.getMonth(),
      selectedDate: nextEvent.date,
    }
  }

  return { year, month, selectedDate: null as string | null }
}

export function EventsCalendar() {
  const today = useMemo(() => new Date(), [])
  const start = useMemo(() => getCalendarStart(today), [today])
  const [monthCursor, setMonthCursor] = useState({
    year: start.year,
    month: start.month,
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(
    start.selectedDate,
  )
  const [dialogEvent, setDialogEvent] = useState<GemaEvent | null>(null)

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

  function selectDate(iso: string) {
    setSelectedDate(iso)
    const datedEvents = getEventsByDate(iso)
    if (datedEvents.length === 1) {
      setDialogEvent(datedEvents[0])
    }
  }

  return (
    <div
      className="events-cal"
      role="group"
      aria-label={`Events calendar, ${monthLabel}`}
    >
      <div className="events-cal__header">
        <h3 className="events-cal__month">{monthLabel}</h3>
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
          const dayEvents = getEventsByDate(iso)
          const hasEvents = eventDates.has(iso)
          const isToday = iso === todayISO
          const isSelected = iso === selectedDate
          const eventNames = dayEvents.map((event) => event.title).join(', ')
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
              aria-label={`${day} ${monthLabel}${isToday ? ', today' : ''}${hasEvents ? `, ${eventNames}` : ''}`}
              onClick={() => selectDate(iso)}
            >
              <span>{day}</span>
              {hasEvents ? <span className="events-cal__dot" /> : null}
            </button>
          )
        })}
      </div>

      {visibleEvents.length === 0 ? (
        <p className="events-cal__empty-copy events-cal__empty-copy--note">
          No upcoming events are currently scheduled.
        </p>
      ) : selectedDate ? (
        <div className="events-cal__selected">
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                compact
                readMoreDetails
                onOpenDetails={setDialogEvent}
              />
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

      {dialogEvent ? (
        <EventDetailsDialog
          event={dialogEvent}
          onClose={() => setDialogEvent(null)}
        />
      ) : null}
    </div>
  )
}
