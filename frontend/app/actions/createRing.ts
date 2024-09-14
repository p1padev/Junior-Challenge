'use server';

import type { FormState } from '@/app/actions/shared';
import ringDataValidation from '@/app/actions/shared';
import postApiCall from '@/app/api/postRing';
import wait from '@/app/utils/scrips';
import { revalidateTag } from 'next/cache';

export async function createRing(prevState: FormState, formData: FormData): Promise<FormState> {
  const { status, data } = ringDataValidation(formData);

  if (status === 'error') {
    return data;
  }

  await wait(2000);

  const result = await postApiCall(data);

  if (result !== 'success') {
    return result;
  }

  revalidateTag('rings');
  return 'success';
}
