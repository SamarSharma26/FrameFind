import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WORKFLOWS } from '../data/categories';
import { ResourceItem } from '../data/types';

interface WorkflowCollectionsProps {
  resources: ResourceItem[];
  onSelectWorkflow: (workflowId: string) => void;
}

export const WorkflowCollections: React.FC<WorkflowCollectionsProps> = ({
  resources,
  onSelectWorkflow,
}) => {
  const getWorkflowCount = (workflowId: string) => {
    return resources.filter((r) => r.workflows.includes(workflowId)).length;
  };

  return (
    <section id="workflows" className="py-20 sm:py-28 border-t border-[#E8E8EB] bg-[#F7F7F8]">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#6B6B72] mb-2 font-medium">
              GOAL-ORIENTED KITS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111111] tracking-tight leading-[1.08] mb-2">
              Browse by editing workflow.
            </h2>
            <p className="text-base text-[#6B6B72] max-w-lg font-normal">
              Jump straight to resources curated for specific timeline objectives.
            </p>
          </div>
        </div>

        {/* 8 Workflows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {WORKFLOWS.map((workflow) => {
            const count = getWorkflowCount(workflow.id);
            return (
              <div
                key={workflow.id}
                onClick={() => onSelectWorkflow(workflow.id)}
                className="card-lift group relative flex flex-col justify-between bg-white border border-[#E8E8EB] hover:border-[#111111] rounded-2xl p-6 cursor-pointer shadow-xs h-full min-h-[200px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: `${workflow.accentColor}18`,
                        color: workflow.accentColor === '#D4FF54' || workflow.accentColor === '#FFD65A' ? '#111111' : workflow.accentColor,
                        borderColor: `${workflow.accentColor}40`,
                      }}
                    >
                      {workflow.badge}
                    </span>
                    <span className="font-mono text-xs text-[#6B6B72] tabular-nums">
                      {count} items
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-[19px] text-[#111111] tracking-tight group-hover:text-[#111111] mb-2">
                    {workflow.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#6B6B72] leading-relaxed mb-6 font-normal">
                    {workflow.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E8EB] mt-auto flex items-center justify-between text-xs font-mono text-[#6B6B72] group-hover:text-[#111111] transition-colors">
                  <span>Browse workflow</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#111111] transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
