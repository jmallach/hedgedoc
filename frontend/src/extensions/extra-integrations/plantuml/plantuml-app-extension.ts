/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { MarkdownRendererExtension } from '../../../components/markdown-renderer/extensions/base/markdown-renderer-extension'
import { AppExtension } from '../../base/app-extension'
import { PlantumlMarkdownExtension } from './plantuml-markdown-extension'

/**
 * Adds support for chart rendering using plantuml to the markdown renderer.
 *
 * @see https://plantuml.com
 */
export class PlantumlAppExtension extends AppExtension {
  buildMarkdownRendererExtensions(): MarkdownRendererExtension[] {
    return [new PlantumlMarkdownExtension()]
  }
}
