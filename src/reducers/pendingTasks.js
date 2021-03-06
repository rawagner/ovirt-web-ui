/*
 * This store subtree keeps track of async actions that were requsted on engine but haven't be confirmed
 * successful/failed yet.
 *
 * Each task is of type { type: string, started: Date }. Other properties depends on the type.
 *
 * This would by nice to be cleaned by events polling.
 */

import { fromJS } from 'immutable'

import { actionReducer } from './utils'
import {
  ADD_DISK_REMOVAL_PENDING_TASK,
  REMOVE_DISK_REMOVAL_PENDING_TASK,
} from '../constants'

export const PendingTaskTypes = {
  DISK_REMOVAL: 'DISK_REMOVAL',
}

const initialState = fromJS([])

export default actionReducer(initialState, {
  [ADD_DISK_REMOVAL_PENDING_TASK] (pendingTasks, { payload }) {
    const existingTask = pendingTasks.find(task =>
      task.type === PendingTaskTypes.DISK_REMOVAL && task.diskId === payload)
    if (existingTask) {
      return pendingTasks
    }
    return pendingTasks.push(payload)
  },
  [REMOVE_DISK_REMOVAL_PENDING_TASK] (pendingTasks, { payload }) {
    const index = pendingTasks.findKey(
      task => task.type === PendingTaskTypes.DISK_REMOVAL && task.diskId === payload.diskId)
    return pendingTasks.delete(index)
  },
})
