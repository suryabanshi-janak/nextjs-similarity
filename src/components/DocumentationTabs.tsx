'use client';

import SimpleBar from 'simplebar-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs';
import Code from '@/ui/Code';
import { nodejs, python } from '@/helpers/documentation-code';

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue='nodejs' className='w-full max-w-2xl'>
      <TabsList>
        <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
        <TabsTrigger value='python'>Python</TabsTrigger>
      </TabsList>

      <TabsContent value='nodejs'>
        <SimpleBar>
          <Code language='javascript' code={nodejs} show animated />
        </SimpleBar>
      </TabsContent>
      <TabsContent value='python'>
        <SimpleBar>
          <Code language='python' code={python} show animated />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
