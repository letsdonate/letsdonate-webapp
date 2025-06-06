import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ListFilter } from 'lucide-react';

const FilterControls = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, currentCategories, activeTab, setCurrentPage }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
      <div className="relative flex-grow w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder={`Search in ${activeTab === "all" ? "All Work" : activeTab.replace('-', ' ')}...`}
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="pl-10 rounded-lg w-full bg-background border-border focus-visible:ring-primary"
        />
      </div>
      {currentCategories.length > 1 && (
        <div className="w-full md:w-auto md:min-w-[200px]">
          <Select value={categoryFilter} onValueChange={(value) => { setCategoryFilter(value); setCurrentPage(1);}}>
            <SelectTrigger className="rounded-lg w-full bg-background border-border focus:ring-primary">
              <ListFilter className="h-4 w-4 mr-2 text-muted-foreground inline-block" />
              <SelectValue placeholder="Filter by category..." />
            </SelectTrigger>
            <SelectContent className="bg-background border-border rounded-lg">
              {currentCategories.map(category => (
                <SelectItem key={category} value={category.toLowerCase()} className="capitalize focus:bg-primary/10">
                  {category === 'all' ? `All Categories` : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default FilterControls;