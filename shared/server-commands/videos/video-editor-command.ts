import { HttpStatusCode, VideoEditorTask } from '@shared/models'
import { AbstractCommand, OverrideCommandOptions } from '../shared'

export class VideoEditorCommand extends AbstractCommand {

  static getComplexTask (): VideoEditorTask[] {
    return [
      // Total duration: 2
      {
        name: 'cut',
        options: {
          start: 1,
          end: 3
        }
      },

      // Total duration: 7
      {
        name: 'add-outro',
        options: {
          file: 'video_short.webm'
        }
      },

      {
        name: 'add-watermark',
        options: {
          file: 'thumbnail.png'
        }
      },

      // Total duration: 9
      {
        name: 'add-intro',
        options: {
          file: 'video_very_short_240p.mp4'
        }
      }
    ]
  }

  createEditionTasks (options: OverrideCommandOptions & {
    videoId: number | string
    tasks: VideoEditorTask[]
  }) {
    const path = '/api/v1/videos/' + options.videoId + '/editor/edit'
    const attaches: { [id: string]: any } = {}

    for (let i = 0; i < options.tasks.length; i++) {
      const task = options.tasks[i]

      if (task.name === 'add-intro' || task.name === 'add-outro' || task.name === 'add-watermark') {
        attaches[`tasks[${i}][options][file]`] = task.options.file
      }
    }

    return this.postUploadRequest({
      ...options,

      path,
      attaches,
      fields: { tasks: options.tasks },
      implicitToken: true,
      defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204
    })
  }
}
