/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { RendererToEditorCommunicatorContextProvider } from '../components/editor-page/render-context/renderer-to-editor-communicator-context-provider'
import { IframeMarkdownRenderer } from '../components/render-page/iframe-markdown-renderer'
import { useApplyDarkMode } from '../hooks/common/use-apply-dark-mode'
import type { NextPage } from 'next'
import React from 'react'

/**
 * Renders the actual markdown renderer that receives the content and meta data via iframe communication.
 */
export const RenderPage: NextPage = () => {
  useApplyDarkMode()

  return (
    <RendererToEditorCommunicatorContextProvider>
      <IframeMarkdownRenderer />
    </RendererToEditorCommunicatorContextProvider>
  )
}

export default RenderPage
