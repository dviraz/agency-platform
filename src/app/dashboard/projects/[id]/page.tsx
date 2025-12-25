import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle,
  Circle,
  MessageSquare,
} from 'lucide-react'
import { ProjectUpdate } from '@/types/database'

const statusColors: Record<string, string> = {
  not_started: 'bg-gray-500',
  discovery: 'bg-blue-500',
  in_progress: 'bg-yellow-500',
  review: 'bg-purple-500',
  revisions: 'bg-orange-500',
  completed: 'bg-green-500',
  on_hold: 'bg-red-500',
  cancelled: 'bg-gray-500',
}

const statusLabels: Record<string, string> = {
  not_started: 'Not Started',
  discovery: 'Discovery',
  in_progress: 'In Progress',
  review: 'Under Review',
  revisions: 'Revisions',
  completed: 'Completed',
  on_hold: 'On Hold',
  cancelled: 'Cancelled',
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // Get project with updates
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_updates (*)
    `)
    .eq('id', params.id)
    .eq('user_id', user?.id)
    .single()

  if (error || !project) {
    notFound()
  }

  const updates = (project.project_updates as unknown as ProjectUpdate[])?.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ) || []

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.project_name}</h1>
          {project.description && (
            <p className="text-muted-foreground mt-2">{project.description}</p>
          )}
        </div>
        <Badge
          variant="secondary"
          className={`${statusColors[project.status]} text-white text-sm px-4 py-1`}
        >
          {statusLabels[project.status]}
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{project.progress_percentage}%</span>
            </div>
            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                style={{ width: `${project.progress_percentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline info */}
      <div className="grid gap-4 md:grid-cols-3">
        {project.started_at && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Started</p>
                  <p className="font-medium">
                    {new Date(project.started_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {project.estimated_completion_date && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Est. Completion</p>
                  <p className="font-medium">
                    {new Date(project.estimated_completion_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {project.completed_at && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="font-medium">
                    {new Date(project.completed_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Deliverables */}
      {project.deliverables && Array.isArray(project.deliverables) && project.deliverables.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Deliverables</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(project.deliverables as Array<{ name?: string; completed?: boolean } | string>).map((item, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  {typeof item === 'object' && item.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  )}
                  <span className={typeof item === 'object' && item.completed ? 'line-through text-muted-foreground' : ''}>
                    {typeof item === 'object' ? item.name : item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Updates/Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Project Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {updates.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No updates yet. We&apos;ll post updates here as your project progresses.
            </p>
          ) : (
            <div className="space-y-6">
              {updates.map((update, index) => (
                <div key={update.id}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{update.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(update.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {update.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {update.description}
                        </p>
                      )}
                      {update.update_type && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {update.update_type.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {index < updates.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notes */}
      {project.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{project.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
