import { ContextType } from '../activitypub/context'
import { VideoEditorTaskCut } from '../videos/editor'
import { VideoResolution } from '../videos/file/video-resolution.enum'
import { SendEmailOptions } from './emailer.model'

export type JobState = 'active' | 'completed' | 'failed' | 'waiting' | 'delayed' | 'paused'

export type JobType =
  | 'activitypub-http-unicast'
  | 'activitypub-http-broadcast'
  | 'activitypub-http-fetcher'
  | 'activitypub-cleaner'
  | 'activitypub-follow'
  | 'video-file-import'
  | 'video-transcoding'
  | 'email'
  | 'video-import'
  | 'videos-views-stats'
  | 'activitypub-refresher'
  | 'video-redundancy'
  | 'video-live-ending'
  | 'actor-keys'
  | 'move-to-object-storage'
  | 'video-edition'

export interface Job {
  id: number
  state: JobState
  type: JobType
  data: any
  priority: number
  progress: number
  error: any
  createdAt: Date | string
  finishedOn: Date | string
  processedOn: Date | string
}

export type ActivitypubHttpBroadcastPayload = {
  uris: string[]
  signatureActorId?: number
  body: any
  contextType?: ContextType
}

export type ActivitypubFollowPayload = {
  followerActorId: number
  name: string
  host: string
  isAutoFollow?: boolean
  assertIsChannel?: boolean
}

export type FetchType = 'activity' | 'video-likes' | 'video-dislikes' | 'video-shares' | 'video-comments' | 'account-playlists'
export type ActivitypubHttpFetcherPayload = {
  uri: string
  type: FetchType
  videoId?: number
}

export type ActivitypubHttpUnicastPayload = {
  uri: string
  signatureActorId?: number
  body: object
  contextType?: ContextType
}

export type RefreshPayload = {
  type: 'video' | 'video-playlist' | 'actor'
  url: string
}

export type EmailPayload = SendEmailOptions

export type VideoFileImportPayload = {
  videoUUID: string
  filePath: string
}

export type VideoImportTorrentPayloadType = 'magnet-uri' | 'torrent-file'
export type VideoImportYoutubeDLPayloadType = 'youtube-dl'

export type VideoImportYoutubeDLPayload = {
  type: VideoImportYoutubeDLPayloadType
  videoImportId: number

  fileExt?: string
}
export type VideoImportTorrentPayload = {
  type: VideoImportTorrentPayloadType
  videoImportId: number
}
export type VideoImportPayload = VideoImportYoutubeDLPayload | VideoImportTorrentPayload

export type VideoRedundancyPayload = {
  videoId: number
}

// Video transcoding payloads

interface BaseTranscodingPayload {
  videoUUID: string
  isNewVideo?: boolean
}

export interface HLSTranscodingPayload extends BaseTranscodingPayload {
  type: 'new-resolution-to-hls'
  resolution: VideoResolution
  copyCodecs: boolean

  hasAudio: boolean
  isPortraitMode?: boolean

  autoDeleteWebTorrentIfNeeded: boolean
  isMaxQuality: boolean
}

export interface NewWebTorrentResolutionTranscodingPayload extends BaseTranscodingPayload {
  type: 'new-resolution-to-webtorrent'
  resolution: VideoResolution

  hasAudio: boolean
  createHLSIfNeeded: boolean

  isPortraitMode?: boolean
}

export interface MergeAudioTranscodingPayload extends BaseTranscodingPayload {
  type: 'merge-audio-to-webtorrent'
  resolution: VideoResolution
  createHLSIfNeeded: true
}

export interface OptimizeTranscodingPayload extends BaseTranscodingPayload {
  type: 'optimize-to-webtorrent'
}

export type VideoTranscodingPayload =
  HLSTranscodingPayload
  | NewWebTorrentResolutionTranscodingPayload
  | OptimizeTranscodingPayload
  | MergeAudioTranscodingPayload

export interface VideoLiveEndingPayload {
  videoId: number
}

export interface ActorKeysPayload {
  actorId: number
}

export interface DeleteResumableUploadMetaFilePayload {
  filepath: string
}

export interface MoveObjectStoragePayload {
  videoUUID: string
  isNewVideo: boolean
}

export type VideoEditorTaskCutPayload = VideoEditorTaskCut

export type VideoEditorTaskIntroPayload = {
  name: 'add-intro'

  options: {
    file: string
  }
}

export type VideoEditorTaskOutroPayload = {
  name: 'add-outro'

  options: {
    file: string
  }
}

export type VideoEditorTaskWatermarkPayload = {
  name: 'add-watermark'

  options: {
    file: string
  }
}

export type VideoEditionTaskPayload =
  VideoEditorTaskCutPayload |
  VideoEditorTaskIntroPayload |
  VideoEditorTaskOutroPayload |
  VideoEditorTaskWatermarkPayload

export interface VideoEditionPayload {
  videoUUID: string
  tasks: VideoEditionTaskPayload[]
}
