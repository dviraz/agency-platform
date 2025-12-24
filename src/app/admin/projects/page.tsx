import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const projectStatuses = [
  'not_started',
  'discovery',
  'in_progress',
  'review',
  'revisions',
  'completed',
  'on_hold',
  'cancelled',
] as const

export const metadata = {
  title: 'Admin Projects',
  description: 'Manage project progress and updates.',
}

async function updateProject(formData: FormData) {
  'use server'

  const projectId = formData.get('projectId')?.toString()
  const status = formData.get('status')?.toString()
  const progressValue = Number(formData.get('progress'))
  const updateTitle = formData.get('updateTitle')?.toString().trim()
  const updateDescription = formData.get('updateDescription')?.toString().trim()

  if (!projectId || !status || Number.isNaN(progressValue)) return

  const supabase = createAdminClient()
  const progress = Math.min(Math.max(progressValue, 0), 100)

  await supabase
    .from('projects')
    .update({
      status,
      progress_percentage: progress,
      updated_at: new Date().toISOString(),
    })
    .eq('id', projectId)

  if (updateTitle) {
    await supabase
      .from('project_updates')
      .insert({
        project_id: projectId,
        title: updateTitle,
        description: updateDescription || null,
        update_type: 'general',
        created_by_admin: true,
      })
  }

  revalidatePath('/admin/projects')
}

export default async function AdminProjectsPage() {
  const supabase = createAdminClient()

  const { data: projects } = await supabase
    .from('projects')
    .select('id, project_name, status, progress_percentage, user_id, created_at')
    .order('created_at', { ascending: false })

  const userIds = Array.from(new Set((projects || []).map((project) => project.user_id)))
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .in('id', userIds.length ? userIds : ['00000000-0000-0000-0000-000000000000'])

  const profileMap = new Map(
    (profiles || []).map((profile) => [profile.id, profile])
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Project Management</h1>
        <p className="text-muted-foreground mt-1">
          Update project status, progress, and share updates with clients.
        </p>
      </div>

      <div className="space-y-4">
        {(projects || []).map((project) => {
          const profile = profileMap.get(project.user_id)
          return (
            <Card key={project.id}>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="text-lg font-semibold">{project.project_name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Client</p>
                    <p className="text-sm">
                      {profile?.full_name || profile?.email || project.user_id}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="text-lg font-semibold">{project.progress_percentage}%</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        project.status === 'completed'
                          ? 'bg-green-500/20 text-green-500'
                          : project.status === 'on_hold' || project.status === 'cancelled'
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-blue-500/20 text-blue-500'
                      }
                    >
                      {project.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </div>

                <form action={updateProject} className="grid gap-4 lg:grid-cols-3">
                  <input type="hidden" name="projectId" value={project.id} />
                  <div className="space-y-2">
                    <Label htmlFor={`progress-${project.id}`}>Progress (%)</Label>
                    <Input
                      id={`progress-${project.id}`}
                      name="progress"
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={project.progress_percentage}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`status-${project.id}`}>Status</Label>
                    <select
                      id={`status-${project.id}`}
                      name="status"
                      defaultValue={project.status}
                      className="h-9 w-full rounded-md border border-white/10 bg-transparent px-3 text-sm text-foreground"
                    >
                      {projectStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 lg:col-span-3">
                    <Label htmlFor={`update-title-${project.id}`}>Add update title</Label>
                    <Input
                      id={`update-title-${project.id}`}
                      name="updateTitle"
                      placeholder="New milestone reached"
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-3">
                    <Label htmlFor={`update-description-${project.id}`}>Update details</Label>
                    <Textarea
                      id={`update-description-${project.id}`}
                      name="updateDescription"
                      rows={3}
                      placeholder="Share the latest progress details for the client."
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <Button type="submit" size="sm">
                      Save changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )
        })}
        {!projects?.length && (
          <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
              No projects available yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
