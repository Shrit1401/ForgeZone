"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/lib/dashboard/projectdashboard.server";
import {
  Step,
  SingleProject,
  StepItem,
  ProjectType,
} from "@/types/project.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type ProjectForm = Omit<SingleProject, "stepsLength">;

export default function CreateSingleProject() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
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
    const projectData: SingleProject = {
      ...form,
      stepsLength: form.steps.reduce(
        (acc, step) => acc + step.stepItems.length,
        0
      ),
    };

    try {
      await createProject(projectData, form.steps);
    } catch (error) {
      toast.error("Error creating project");
    }
  };

  return (
    <section className="mt-16 mx-4">
      <h1 className="text-4xl font-bold text-white mb-8">Create New Build</h1>

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
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, oneLiner: e.target.value }))
                }
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
                value={form.projectType.toString()}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    projectType: Number(value) as ProjectType,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProjectType.none.toString()}>
                    None
                  </SelectItem>
                  <SelectItem value={ProjectType.weekend.toString()}>
                    Weekend
                  </SelectItem>
                  <SelectItem value={ProjectType.advance.toString()}>
                    Advanced
                  </SelectItem>
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
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    twitterMessage: e.target.value,
                  }))
                }
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {(Object.keys(item) as (keyof StepItem)[]).map((key) => (
                    <Input
                      key={key}
                      placeholder={key}
                      value={item[key]}
                      onChange={(e) =>
                        updateStepItem(
                          stepIndex,
                          itemIndex,
                          key,
                          e.target.value
                        )
                      }
                    />
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-500 md:col-span-2 justify-start"
                    onClick={() => removeStepItem(stepIndex, itemIndex)}
                  >
                    Remove Step Item
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="link"
                onClick={() => addStepItem(stepIndex)}
              >
                + Add Step Item
              </Button>
            </div>
          ))}
        </div>

        <Button type="submit" className="mt-6">
          Submit Project
        </Button>
      </form>
    </section>
  );
}
