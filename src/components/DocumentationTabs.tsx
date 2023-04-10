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
        <Code language='javascript' code={nodejs} show animated />
      </TabsContent>
      <TabsContent value='python'>
        <Code language='python' code={python} show animated />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
