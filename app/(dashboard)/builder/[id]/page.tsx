import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import React from 'react';

interface BuilderPageProps {
  params: Promise<{ id: string }>; // Update type to reflect a Promise
}

async function BuilderPage({ params }: BuilderPageProps) {
  const { id } = await params; // Await params before destructuring
  const form = await GetFormById(Number(id)); // Convert id to a number if necessary

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
}

export default BuilderPage;
