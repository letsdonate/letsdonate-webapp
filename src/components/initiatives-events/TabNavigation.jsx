import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8 bg-primary/5 p-1 rounded-lg h-auto">
        <TabsTrigger value="all" className="py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">All Work</TabsTrigger>
        <TabsTrigger value="initiatives" className="py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Our Initiatives</TabsTrigger>
        <TabsTrigger value="events" className="py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md">Events</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabNavigation;