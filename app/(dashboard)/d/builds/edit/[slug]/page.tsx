"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GetBuildBySlug } from "@/lib/build/builds.server";
import { updateProject } from "@/lib/dashboard/projectdashboard.server";
import {
  Step,
  SingleProject,
  StepItem,
  ProjectType,
} from "@/types/project.types";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProjectForm = Omit<SingleProject, "stepsLength">;

export default function EditProject() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ProjectForm>({
    name: "",
    oneLiner: "",
    discordRole: "",
    twitterMessage: "",
    isFeatured: false,
    normalImg: "",
    activeImg: "",
    projectSlug: "",
    projectType: ProjectType.none,
    steps: [],
  });

  useEffect(() => {
    const fetchBuild = async () => {
      setLoading(true);
      try {
        const build = await GetBuildBySlug(slug);
        if (build) {
          setForm({
            name: build.name,
            oneLiner: build.oneLiner,
            discordRole: build.discordRole,
            twitterMessage: build.twitterMessage,
            isFeatured: build.isFeatured,
            normalImg: build.normalImg,
            activeImg: build.activeImg,
            projectSlug: build.projectSlug,
            // Use the projectType value that is now properly converted in builds.server.ts
            projectType: build.projectType,
            steps: build.steps,
          });
        } else {
          toast.error("Build not found");
          router.push("/d/builds");
        }
      } catch (error) {
        console.error("Error fetching build:", error);
        toast.error("Failed to load build");
      } finally {
        setLoading(false);
      }
    };

    fetchBuild();
  }, [slug, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addStep = () => {
    setForm((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          name: "",
          stepItems: [
            {
              text: "",
              slug: "",
              source: "",
              requirementMessage: "",
            },
          ],
        },
      ],
    }));
  };

  const removeStep = (stepIndex: number) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== stepIndex),
    }));
  };

  const updateStep = (
    index: number,
    key: keyof Step,
    value: string | StepItem[]
  ) => {
    const steps = [...form.steps];
    steps[index] = {
      ...steps[index],
      [key]: value,
    };
    setForm((prev) => ({ ...prev, steps }));
  };

  const addStepItem = (stepIndex: number) => {
    const steps = [...form.steps];
    steps[stepIndex].stepItems.push({
      text: "",
      slug: "",
      source: "",
      requirementMessage: "",
    });
    setForm((prev) => ({ ...prev, steps }));
  };

  const removeStepItem = (stepIndex: number, itemIndex: number) => {
    const steps = [...form.steps];
    steps[stepIndex].stepItems.splice(itemIndex, 1);
    setForm((prev) => ({ ...prev, steps }));
  };

  const moveStepItemUp = (stepIndex: number, itemIndex: number) => {
    if (itemIndex === 0) return; // Can't move up if already at top
    const steps = [...form.steps];
    const stepItems = [...steps[stepIndex].stepItems];
    [stepItems[itemIndex], stepItems[itemIndex - 1]] = [
      stepItems[itemIndex - 1],
      stepItems[itemIndex],
    ];
    steps[stepIndex].stepItems = stepItems;
    setForm((prev) => ({ ...prev, steps }));
  };

  const moveStepItemDown = (stepIndex: number, itemIndex: number) => {
    const steps = [...form.steps];
    const stepItems = [...steps[stepIndex].stepItems];
    if (itemIndex === stepItems.length - 1) return; // Can't move down if already at bottom
    [stepItems[itemIndex], stepItems[itemIndex + 1]] = [
      stepItems[itemIndex + 1],
      stepItems[itemIndex],
    ];
    steps[stepIndex].stepItems = stepItems;
    setForm((prev) => ({ ...prev, steps }));
  };

  const updateStepItem = (
    stepIndex: number,
    itemIndex: number,
    key: keyof StepItem,
    value: string
  ) => {
    const steps = [...form.steps];
    steps[stepIndex].stepItems[itemIndex][key] = value;
    setForm((prev) => ({ ...prev, steps }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const projectData: SingleProject = {
        ...form,
        stepsLength: form.steps.reduce(
          (acc, step) => acc + step.stepItems.length,
          0
        ),
      };

      await updateProject(form.projectSlug, projectData, form.steps);
      toast.success("Project updated successfully");
      router.push("/d/builds");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="mt-[4rem] mx-4">
        <div className="h-10 w-48 bg-[#333] rounded animate-pulse mb-8"></div>
        <div className="h-6 w-full max-w-md bg-[#333] rounded animate-pulse mb-4"></div>
        <div className="h-6 w-full max-w-lg bg-[#333] rounded animate-pulse mb-4"></div>
        <div className="h-6 w-full max-w-sm bg-[#333] rounded animate-pulse mb-4"></div>
      </section>
    );
  }

  return (
    <section className="mt-[4rem] mx-4 pb-20">
      <h1 className="text-4xl font-bold text-white mb-8">
        Edit Build: {form.name}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info Fields */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Build Name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="oneLiner">Description</Label>
              <Textarea
                name="oneLiner"
                id="oneLiner"
                value={form.oneLiner}
                onChange={handleChange}
                placeholder="Brief description of the build"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectSlug">Project Slug</Label>
              <Input
                name="projectSlug"
                id="projectSlug"
                value={form.projectSlug}
                onChange={handleChange}
                placeholder="URL-friendly identifier"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Select
                value={ProjectType[form.projectType].toString()}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    projectType: ProjectType[value as keyof typeof ProjectType],
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="advance">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Images and Social Fields */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Media & Integration</h2>
            <div className="space-y-2">
              <Label htmlFor="normalImg">Normal Image URL</Label>
              <Input
                name="normalImg"
                id="normalImg"
                value={form.normalImg}
                onChange={handleChange}
                placeholder="URL to image when inactive"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activeImg">Active Image URL</Label>
              <Input
                name="activeImg"
                id="activeImg"
                value={form.activeImg}
                onChange={handleChange}
                placeholder="URL to image when active"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discordRole">Discord Role ID</Label>
              <Input
                name="discordRole"
                id="discordRole"
                value={form.discordRole}
                onChange={handleChange}
                placeholder="Discord role ID for integration"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterMessage">Twitter Message</Label>
              <Textarea
                name="twitterMessage"
                id="twitterMessage"
                value={form.twitterMessage}
                onChange={handleChange}
                placeholder="Default Twitter share message"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="isFeatured"
            checked={form.isFeatured}
            onCheckedChange={(checked) =>
              setForm((prev) => ({
                ...prev,
                isFeatured: Boolean(checked),
              }))
            }
          />
          <Label htmlFor="isFeatured">Mark as Featured</Label>
        </div>

        {/* Steps Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Steps</h2>
            <Button type="button" onClick={addStep}>
              + Add Step
            </Button>
          </div>

          {form.steps.map((step, stepIndex) => (
            <div
              key={stepIndex}
              className="p-5 bg-[#333] rounded-lg border border-gray-700 space-y-4"
            >
              <div className="flex justify-between gap-4">
                <Input
                  value={step.name}
                  onChange={(e) =>
                    updateStep(stepIndex, "name", e.target.value)
                  }
                  placeholder="Step Name"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => removeStep(stepIndex)}
                >
                  Remove
                </Button>
              </div>

              {/* Step Items */}
              {step.stepItems.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#222] rounded-lg"
                >
                  <div className="md:col-span-2 flex justify-end gap-2 mb-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveStepItemUp(stepIndex, itemIndex)}
                      disabled={itemIndex === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveStepItemDown(stepIndex, itemIndex)}
                      disabled={itemIndex === step.stepItems.length - 1}
                    >
                      ↓
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => removeStepItem(stepIndex, itemIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  {(Object.keys(item) as (keyof StepItem)[]).map((key) => (
                    <div key={key} className="space-y-2">
                      <Label
                        htmlFor={`step-${stepIndex}-item-${itemIndex}-${key}`}
                      >
                        {key}
                      </Label>
                      {key === "requirementMessage" ? (
                        <Textarea
                          id={`step-${stepIndex}-item-${itemIndex}-${key}`}
                          placeholder={key}
                          value={item[key] || ""}
                          onChange={(e) =>
                            updateStepItem(
                              stepIndex,
                              itemIndex,
                              key,
                              e.target.value
                            )
                          }
                          rows={3}
                        />
                      ) : (
                        <Input
                          id={`step-${stepIndex}-item-${itemIndex}-${key}`}
                          placeholder={key}
                          value={item[key] || ""}
                          onChange={(e) =>
                            updateStepItem(
                              stepIndex,
                              itemIndex,
                              key,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => addStepItem(stepIndex)}
                className="w-full"
              >
                + Add Step Item
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/d/builds")}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Updating..." : "Update Project"}
          </Button>
        </div>
      </form>
    </section>
  );
}
