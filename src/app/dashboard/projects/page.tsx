import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FolderKanban, Clock, ArrowRight } from 'lucide-react'

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

export const metadata = {
  title: 'Projects',
  description: 'View and manage your projects',
}

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-1">Track the progress of all your projects.</p>
      </div>

      {/* Projects grid */}
      {!projects || projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FolderKanban className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No projects yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Once you purchase a service and complete the intake form, your project will appear here.
            </p>
            <Button asChild>
              <Link href="/#services">Browse Services</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:border-white/20 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.project_name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={`${statusColors[project.status]} text-white`}
                  >
                    {statusLabels[project.status]}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description || 'No description available'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{project.progress_percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${project.progress_percentage}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-4 space-y-2">
                  {project.started_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Started: {new Date(project.started_at).toLocaleDateString()}</span>
                    </div>
                  )}
                  {project.estimated_completion_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Est. completion: {new Date(project.estimated_completion_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="sm" className="mt-4 w-full" asChild>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
