import py0d as zd
import sys

grammar_name = ""
support = ""

cleanup_grammar_name = ""
cleanup_support = ""

def main ():
    global grammar_name, support, cleanup_grammar_name, cleanup_support

    print (sys.argv)

    root_project = sys.argv [1] 
    root_0D = sys.argv [2]
    i = 3
    grammar_name = sys.argv [i]
    i += 1
    support = sys.argv [i]
    i += 1

    cleanup_grammar_name = sys.argv [i]
    i += 1
    cleanup_support = sys.argv [i]
    i += 1

    arg = sys.argv [i]
    i += 1
    main_container_name = sys.argv [i]
    i += 1
    diagram_names = sys.argv [i:]
    i += 1

    # print (f'root_project={root_project} root_0D={root_0D}')
    # print (f'grammar_name={grammar_name} support={support}')
    # print (f'cleanup_grammar_name={cleanup_grammar_name} cleanup_support={cleanup_support}')
    # print (f'arg={arg} main_container_name={main_container_name} diagram_names={diagram_names}')

    palette = zd.initialize_component_palette (root_project, root_0D, diagram_names, components_to_include_in_project)
    zd.run (palette, root_project, root_0D, arg, main_container_name, diagram_names, start_function,
              show_hierarchy=False, show_connections=False, show_traces=False, show_all_outputs=False)

def start_function (root_project, root_0D, arg, main_container):
    global grammar_name, support, cleanup_grammar_name, cleanup_support

    # grammar name, ohm, rwr, and, support filenames
    g = zd.new_datum_string (grammar_name)
    msg = zd.make_message("grammar&#xa;name", g)
    zd.inject (main_container, msg)

    g = zd.new_datum_string (grammar_name + ".ohm")
    msg = zd.make_message("ohm", g)
    zd.inject (main_container, msg)

    g = zd.new_datum_string (grammar_name + ".rwr")
    msg = zd.make_message("rwr", g)
    zd.inject (main_container, msg)

    g = zd.new_datum_string (support)
    msg = zd.make_message("support", g)
    zd.inject (main_container, msg)

    

    g = zd.new_datum_string (cleanup_grammar_name)
    msg = zd.make_message("cleanup&#xa;grammar&#xa;name", g)
    zd.inject (main_container, msg)

    g = zd.new_datum_string (cleanup_grammar_name + ".ohm")
    msg = zd.make_message("cleanup&#xa;ohm", g)
    zd.inject (main_container, msg)

    g = zd.new_datum_string (cleanup_grammar_name + ".rwr")
    msg = zd.make_message("cleanup&#xa;rwr", g)
    zd.inject (main_container, msg)

    g = zd.new_datum_string (cleanup_support)
    msg = zd.make_message("cleanup&#xa;support", g)
    zd.inject (main_container, msg)


    
    # input source to be t2t'd
    arg = zd.new_datum_string (arg)
    msg = zd.make_message("", arg)
    zd.inject (main_container, msg)

def components_to_include_in_project (root_project, root_0D, reg):
    pass

def t2t_parse_command_line_args ():
    # return a 5-element array [root_project, root_0D, arg, main_container_name, [diagram_names]]
    if (len (sys.argv) < (5+1)):
        load_error ("usage: ${_00_} ${_0D_} app <arg> <main tab name> <diagram file name 1> ...")
        return None
    else:
        root_project = sys.argv [1]
        root_0D = sys.argv [2]
        arg = sys.argv [3]
        main_container_name = sys.argv [4]
        diagram_source_files = sys.argv [5:]
        return [root_project, root_0D, arg, main_container_name, diagram_source_files]

main ()
