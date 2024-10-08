/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { NotePermissions } from '../../../api/notes/types'
import type { NoteDetails } from '../types/note-details'

/**
 * Builds the updated state from a given previous state and updated NotePermissions data.
 * @param state The previous note details state.
 * @param serverPermissions The updated NotePermissions data.
 */
export const buildStateFromServerPermissions = (
  state: NoteDetails,
  serverPermissions: NotePermissions
): NoteDetails => {
  return {
    ...state,
    permissions: serverPermissions
  }
}
