"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createProject } from "@/lib/dashboard/projectdashboard.server";
import { Step, SingleProject, StepItem } from "@/types/project.types";

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
      console.log("Project created successfully");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <section className="mt-16 mx-4">
      <h1 className="text-4xl font-bold text-white mb-8">Create New Build</h1>

      <form onSubmit={handleSubmit} className="space-y-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Object.keys(form) as (keyof ProjectForm)[])
            .filter((key) => key !== "steps" && key !== "isFeatured")
            .map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>{field}</Label>
                <Input
                  name={field}
                  id={field}
                  value={form[field] as string}
                  onChange={handleChange}
                  placeholder={field}
                  required={[
                    "name",
                    "normalImg",
                    "activeImg",
                    "projectSlug",
                  ].includes(field)}
                />
              </div>
            ))}
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
