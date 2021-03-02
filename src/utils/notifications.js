import * as Notifications from "expo-notifications"
import { notificationSettings } from '../../app.json'
import { getLastQuizTime } from './api'
import { diffHours } from './helpers'

const notificationPayLoad = {
  shouldShowAlert: true,
  shouldPlaySound: true,
  shouldSetBadge: true,
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    const {duration} = notificationSettings

    return getLastQuizTime().then((quizTime) => {
      // notify if last quiz was done more than `duraton` hours ago
      if(quizTime && diffHours(quizTime, Date.now()) > duration)
        return notificationPayLoad
    })
  }
})


export async function scheduleStudyNotification() {
  // At what hour:mintue of the day to trigger notification,
  // set in 24 hrs format
  const {hour, minute} = notificationSettings

  const now = new Date()
  const notifyAt = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour, minute, 0
  )

  const trigger = notifyAt

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Study Reminder!',
      body:  'You haven\'t completed any quiz today. Let\'s study!',
    },
    trigger,
  })
}
